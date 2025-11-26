from fastapi import HTTPException

class EventNotFoundError(HTTPException):
    def __init__(self, event_id: int = None):
        detail = f"Event with ID {event_id} not found" if event_id else "Event not found"
        super().__init__(status_code=404, detail=detail)
