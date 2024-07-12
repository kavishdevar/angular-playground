import { Component } from "@angular/core";

@Component({
  selector: "app-learn",
  templateUrl: "./learn.component.html",
//   styleUrls: ["./learn.component.scss"],
})
export class LearnComponent {
  isLoggedIn = localStorage.getItem("isLoggedIn");
  accessToken = localStorage.getItem("accessToken");
}