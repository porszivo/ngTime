import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  trelloBoards = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.listTrelloBoards();
  }

  listTrelloBoards() {
    this.userService.getTrelloBoards()
      .then(boards => {
        this.trelloBoards = boards;
      });
  }

  editId(oldval, newval) {
    this.userService.editTrelloBoard(oldval, newval)
      .then(data => this.listTrelloBoards());
  }

  saveBoard(boardId) {
    this.userService.addTrelloBoard(boardId)
      .then(data => console.log(data));
  }

}
