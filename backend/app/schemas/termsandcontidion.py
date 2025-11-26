from typing import List, Optional
from pydantic import BaseModel, Field

class TermsAndConditions(BaseModel):
    id: str = Field(default=None, alias="_id")
    content: str

class ContentSchema(BaseModel):
    for_organizers: List[str]
    for_audience: List[str]
    general_terms: List[str]

class UpdateContentSchema(BaseModel):
    for_organizers: Optional[List[str]] = None
    for_audience: Optional[List[str]] = None
    general_terms: Optional[List[str]] = None