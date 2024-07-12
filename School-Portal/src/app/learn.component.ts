import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-learn",
  templateUrl: "./learn.component.html",
  imports: [MatExpansionModule, MatButtonModule, MatListModule, MatIconModule, RouterModule],
  standalone: true,
  //   styleUrls: ["./learn.component.scss"],
})
export class LearnComponent {
  constructor() {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    let accessToken = localStorage.getItem("accessToken") as String;
    let userID = localStorage.getItem("userID") as String
    fetch("https://api-v2-6-0.eapp.vidyamandir.com/mysa/connectorg/organizations/1/login", {
      "body": ``,
      "method": "POST"
    })
    fetch(
      `https://api-v2-6-0.eapp.vidyamandir.com/mysa/practice/organization/1/users/${userID}/domains/e_3/node`, {
      "headers": { "token": accessToken.toString(), "userid": userID.toString() }
    }
    ).then(resp => resp.json().then(json => {
      /* 
      [
        {
          "collectionType": "QUESTION",
          "collectionId": "",
          "nodeId": "1770d2bb-718b-4889-aa5e-6a9ecc37e264",
          "nodeName": "Mathematics",
          "nodeUrl": null,
          "nodeType": "SUBJECT",
          "order": 0,
          "nodeImage": "Entities/subject/1630550169109-1628468847928Math.png",
          "showImage": "True",
          "skillLevel": 0
        },
        {
          "collectionType": "QUESTION",
          "collectionId": "",
          "nodeId": "41771f70-c2d5-4c85-95cb-fa6e8e1542e5",
          "nodeName": "Chemistry",
          "nodeUrl": null,
          "nodeType": "SUBJECT",
          "order": 10,
          "nodeImage": "Entities/subject/1630588641335-1628666924630chemistryicon1.png",
          "showImage": "True",
          "skillLevel": 0
        },
        {
          "collectionType": "QUESTION",
          "collectionId": "",
          "nodeId": "a8174a9e-e304-4adb-a3bd-ef178f088d9b",
          "nodeName": "Physics",
          "nodeUrl": null,
          "nodeType": "SUBJECT",
          "order": 20,
          "nodeImage": "Entities/subject/1630587648396-1628487891386physicsicon13.jpg",
          "showImage": "True",
          "skillLevel": 0
        },
        {
          "collectionType": "QUESTION",
          "collectionId": "",
          "nodeId": "53fd56c8-a3f7-44e8-8377-7ecddc525d02",
          "nodeName": "Orientation",
          "nodeUrl": null,
          "nodeType": "CATEGORY",
          "order": 70,
          "nodeImage": "",
          "showImage": "False",
          "skillLevel": 0
        },
        {
          "collectionType": "",
          "collectionId": "",
          "nodeId": "13ac06af-710b-464e-916a-3dd0f97bacf7",
          "nodeName": "JEE Content",
          "nodeUrl": null,
          "nodeType": "FOLDER",
          "order": 100,
          "nodeImage": null,
          "showImage": "false",
          "skillLevel": 0
        },
        {
          "collectionType": "",
          "collectionId": "",
          "nodeId": "79a0a0a1-c79a-4efb-8e4f-0b217a03657a",
          "nodeName": "JEE Test Papers",
          "nodeUrl": null,
          "nodeType": "FOLDER",
          "order": 120,
          "nodeImage": null,
          "showImage": "false",
          "skillLevel": 0
        },
        {
          "collectionType": "",
          "collectionId": "",
          "nodeId": "460a40ef-a8a4-49cd-90a3-8914ca3f24b9",
          "nodeName": "JEE Classes Recording",
          "nodeUrl": null,
          "nodeType": "FOLDER",
          "order": 120,
          "nodeImage": null,
          "showImage": "false",
          "skillLevel": 0
        }
        ]
      */

        interface response {
          collectionType: string,
          collectionId: string,
          nodeId: string,
          nodeName: string,
          nodeUrl: string,
          nodeType: string,
          order: number,
          nodeImage: string,
          showImage: string,
          skillLevel: number
        }
        json = json as response[];
        let practiceSubjects = json.filter((node: { nodeType: string; }) => node.nodeType == "SUBJECT");
        let folders = json.filter((node: { nodeType: string; }) => node.nodeType == "FOLDER");
        let categories = json.filter((node: { nodeType: string; }) => node.nodeType == "CATEGORY");
        return { practiceSubjects, folders, categories }
      }
    ));
  }
}