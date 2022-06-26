interface SlideEffectInitEvent {
  eventName: string
  detail?: Record<string, any>
}

interface SlideEffectEvent {
  eventName: string
  eventTimeStamp: number
  detail: Record<string, any>
}
