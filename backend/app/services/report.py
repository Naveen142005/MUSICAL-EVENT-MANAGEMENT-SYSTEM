from sqlalchemy.orm import Session
from sqlalchemy import and_, func, or_
from app.exceptions.handler import EventNotFoundError
from app.models.bookings import Bookings, BookingDetails
from app.models.enum import BookingStatus, EventStatus
from app.models.events import Event
from datetime import date, datetime
from typing import Optional
from app.services.payment import payment_service

class ReportService:
    
    def get_event_report(self, event_id: int, start_date: Optional[date], end_date: Optional[date], db: Session):
        """Event booking report"""
        event = db.query(Event).filter(Event.id == event_id).first()
        amount = event.total_amount
        isCancelled = False
        if not event:
            raise EventNotFoundError(event_id)
        
        if event.status == EventStatus.CANCELLED:
            amount = payment_service.calculate_refund(amount, event.event_date)
            isCancelled = True
        
        bookings = {}
        
        if not isCancelled:
            if event.ticket_enabled:
                query = db.query(Bookings).filter(Bookings.event_id == event_id)
                
                if start_date:
                    query = query.filter(Bookings.created_at >= datetime.combine(start_date, datetime.min.time()))
                if end_date:
                    query = query.filter(Bookings.created_at <= datetime.combine(end_date, datetime.max.time()))
                    
                query.filter(Bookings.status == BookingStatus.BOOKED)
                bookings = query.all()
        
        
        data = {
            "event_name": event.name,
            "event_date": str(event.event_date),
        }

        if len(bookings) > 0:
            data["total_bookings"] = len(bookings)

        total_tickets = sum(b.total_tickets for b in bookings)
        if total_tickets > 0:
            data["total_tickets"] = total_tickets

        total_revenue = sum(b.total_amount for b in bookings) + (amount if amount != 0 else 0)
        if total_revenue > 0:
            data["total_revenue"] = total_revenue

        return data



    def get_all_events_report(self, start_date: Optional[date], end_date: Optional[date], db: Session):
        """All events report"""
        query = db.query(Event)
  
        if start_date:
            query = query.filter(Event.event_date >= start_date)
        if end_date:
            query = query.filter(Event.event_date <= end_date)
        
        events = query.all()
        reports = []
        
        
        for event in events:
            bookings = (db.query(Bookings).filter(
                and_(
                    Bookings.event_id == event.id,
                    or_ (Bookings.status == BookingStatus.BOOKED , Bookings.status == BookingStatus.COMPLETED)
                    
                )
                
                ).all())
            
            total_bookings = len(bookings)
            total_tickets = sum(b.total_tickets for b in bookings)
            total_revenue = sum(b.total_amount for b in bookings) +  event.total_amount
            
            data = {
                "event_name": event.name,
                "event_date": str(event.event_date),    
            }
            
            if total_bookings > 0:
                data["total_bookings"] = total_bookings
            if total_tickets > 0:
                data["total_tickets"] = total_tickets
            if total_revenue > 0:
                data["total_revenue"] = total_revenue 
            
            reports.append(data)
        
        return {"events": reports}



    def get_ticket_report(self, start_date: Optional[date], end_date: Optional[date], db: Session):
        """Ticket sales report - Case insensitive grouping"""
        query = db.query(
            func.lower(BookingDetails.ticket_type).label("ticket_type"),
            func.sum(BookingDetails.quantity).label("quantity"),
            func.sum(BookingDetails.sub_total).label("revenue")
        ).join(Bookings)
        
        if start_date:
            query = query.filter(Bookings.created_at >= datetime.combine(start_date, datetime.min.time()))
        if end_date:
            query = query.filter(Bookings.created_at <= datetime.combine(end_date, datetime.max.time()))
        
        results = query.group_by(func.lower(BookingDetails.ticket_type)).all()
        
        total_revenue = sum(r.revenue for r in results)
        
        tickets = [
            {
                "ticket_type": r.ticket_type.capitalize(),
                "quantity_sold": r.quantity,
                "revenue": r.revenue,
                "percentage": round((r.revenue / total_revenue * 100) if total_revenue > 0 else 0, 2)
            } for r in results
        ]
        
        return {"tickets": tickets}


report_service = ReportService()
