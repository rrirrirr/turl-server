export interface Result {}

export class Game {
  id: string
  name: string
  court: string
  startTime: string
  result: Result
  venue: string
  tournament_id: string
}
