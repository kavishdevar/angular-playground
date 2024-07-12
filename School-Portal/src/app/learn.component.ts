import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-learn",
  templateUrl: "./learn.component.html",
  imports: [MatExpansionModule, MatButtonModule, MatListModule, MatIconModule, RouterModule, CommonModule],
  standalone: true,
  styleUrl: "./learn.component.scss",
})
export class LearnComponent {
  practiceSubjects: any;
  folders: any;
  categories: any;
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
      this.practiceSubjects = json.filter((node: { nodeType: string; }) => node.nodeType == "SUBJECT");
      this.folders = json.filter((node: { nodeType: string; }) => node.nodeType == "FOLDER");
      this.categories = json.filter((node: { nodeType: string; }) => node.nodeType == "CATEGORY");
      for (let i = 0; i < this.folders.length; i++) {
        fetch(`https://api-v2-6-0.eapp.vidyamandir.com/mysa/practice/organization/1/users/${userID}/domains/e_3/folder/${this.folders[i].nodeId}`, {
          "headers": {
            "token": accessToken.toString(),
            "userid": userID.toString()
          }
        }).then(resp => resp.json().then(json => {
          interface response {
            isLocked: boolean,
            isRead: boolean,
            contentId: string,
            contentType: string,
            nodeId: string,
            nodeName: string,
            nodeType: string,
            order: number
          }
          json = json as response[];
          for (let i = 0; i < json.length; i++) {
            fetch(`https://api-v2-6-0.eapp.vidyamandir.com/mysa/practice/organization/1/users/${userID}/domains/e_3/folder/${json[i].contentId}`, {
              "headers": {
                "token": accessToken.toString(),
                "userid": userID.toString()
              }
            }).then(resp => resp.json().then(subjects => {
              subjects = subjects as response[];
              for (let j = 0; j < 1; j++) {
                fetch(`https://api-v2-6-0.eapp.vidyamandir.com/mysa/practice/organization/1/users/${userID}/domains/e_3/folder/${subjects[j].contentId}`, {
                  "headers": {
                    "token": accessToken.toString(),
                    "userid": userID.toString()
                  }
                }).then(resp => resp.json().then(chapters => {
                  chapters = chapters as response[];
                  for (let k = 0; k < 1; k++) {
                    fetch(`https://api-v2-6-0.eapp.vidyamandir.com/mysa/practice/organization/1/users/${userID}/domains/e_3/folder/${chapters[k].ncontentIdodeId}`, {
                      "headers": {
                        "token": accessToken.toString(),
                        "userid": userID.toString()
                      }
                    }).then(resp => resp.json().then(bookType => {
                      bookType = bookType as response[];
                      for (let l = 0; l < bookType.length; l++) {
                        console.log("https://api-v2-6-0.eapp.vidyamandir.com/mysa/practice/organization/1/users/0d3932e3-33d3-4108-9f3c-a49ff8476dc8/domains/e_3/folder/4adf1b1d-f087-4f08-828f-579ac29dcf00")
                        console.log(`https://api-v2-6-0.eapp.vidyamandir.com/mysa/practice/organization/1/users/${userID}/domains/e_3/folder/${bookType[l].contentId}`)
                        fetch(`https://api-v2-6-0.eapp.vidyamandir.com/mysa/practice/organization/1/users/${userID}/domains/e_3/folder/${bookType[l].contentId}`, {
                          "headers": {
                            "token": accessToken.toString(),
                            "userid": userID.toString()
                          }
                        }).then(resp => resp.json().then(pdfs => {
                          interface pdfs {
                            isLocked: boolean,
                            isRead: boolean,
                            contentId: string,
                            nodeContentId: string,
                            contentType: string,
                            order: number,
                            name: string,
                            pdf?: {
                              name: string,
                              description: string,
                              order: number,
                              s3PdfId: string,
                              pdfUrl: string,
                              batchIds: string[],
                              isPublic: string,
                              allowStudentsToDownload: boolean,
                              isPublished: string
                            }
                          }
                          pdfs = pdfs as pdfs[];
                          // store pdfs into book type into chapters into subjects into folders
                          if (this.folders[i] && this.folders[i].subjects[j] && this.folders[i].subjects[j].chapters[k] && this.folders[i].subjects[j].chapters[k].bookType[l]) {
                            this.folders[i].subjects[j].chapters[k].bookType[l].pdfs = pdfs;
                          }
                        }));
                      }
                    }));
                  }
                }));
              }
            }
            ));
          }
        }));
      }
    }
    ));
    console.log(this.folders);
  }
}