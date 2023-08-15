import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Board } from '../board.model';
import { BoardService } from '../board.service';
import { TaskDialogComponent } from '../dialogs/task-dialog.component';
import { Task } from "../board.model";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  @Input()
  board!: Board;

  constructor(private boardService: BoardService, private dialog: MatDialog) { }

  taskDrop(event: CdkDragDrop<string[]>) {
    // @ts-ignore
    moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex);
    // @ts-ignore
    this.boardService.updateTasks(this.board.id, this.board.tasks);
  }

  openDialog(task?: Task, idx?: number): void {
    const newTask = { label: 'purple' };
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: task
        ? { task: { ...task }, isNew: false, boardId: this.board.id, idx }
        : { task: newTask, isNew: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.isNew) {
          this.boardService.updateTasks(this.board.id as string, [
            ...this.board.tasks as Task[],
            result.task
          ]);
        } else {
          const update = this.board.tasks as Task[];
          update.splice(result.idx, 1, result.task);
          // @ts-ignore
          this.boardService.updateTasks(this.board.id as string, this.board.tasks as Task[]);
        }
      }
    });
  }

  handleDelete() {
    this.boardService.deleteBoard(this.board.id as string);
  }
}
