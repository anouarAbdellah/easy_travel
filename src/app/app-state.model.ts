import { PostState } from "./posts/post.reducer";
import { TripState } from "./trips/trip.reducer";

export default interface AppState {
    posts: PostState,
    trips: TripState
}