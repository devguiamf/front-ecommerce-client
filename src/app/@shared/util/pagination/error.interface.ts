import { HttpErrorResponse, HttpEventType, HttpHeaders } from "@angular/common/http";

interface ErrorMessage {
    details: string,
    message: string
    error: string
}

export interface ErrorApiResponse extends HttpErrorResponse {
    error: ErrorMessage
}