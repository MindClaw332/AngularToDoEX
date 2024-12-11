import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority?: 'low' | 'medium' | 'high';
  category?: 'work' | 'personal' | 'shopping' | 'health';
  dueDate?: Date;
}

// ? makes an attribute optional

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newTaskTitle: string = '';
  selectedPriority: 'low' | 'medium' | 'high' = 'medium';
  selectedCategory: 'work' | 'personal' | 'shopping' | 'health';
  selectedFilter: 'work' | 'personal' | 'shopping' | 'health' | 'all';
  // : 'low' | 'medium' | 'high'` is a union type that means: the attribute can only have one of these 3 values!



  allTasks: Task[] = [
    { id: 1, title: 'Learn Angular 19', completed: false, priority: 'high', category: 'health' },
    { id: 2, title: 'Buy a We love Trump/Elon bromance t-shirt', completed: true, priority: 'medium', category: 'work' },
    { id: 3, title: 'Paint jef\'s fireship logo on garage door', completed: false, priority: 'high', category: 'personal' },
    { id: 4, title: 'Binge watch techie movies & series', completed: false, priority: 'low', category: 'shopping' },
  ];

  tasks: Task[] = this.allTasks;

  addTask() {
    if (this.newTaskTitle.trim()) {
      const newTask: Task = {
        id: this.tasks.length + 1,
        title: this.newTaskTitle,
        completed: false,
        priority: this.selectedPriority,
        category: this.selectedCategory
      };
      this.allTasks.push(newTask);
      this.applyFilter();
      this.newTaskTitle = ''; // Reset input
    }
  }

  toggleTask(task: Task) {
    console.log(task);
    console.log('Before:', task.completed);  // e.g., false
    task.completed = !task.completed;
    console.log('After:', task.completed);  // e.g., true
  }

  applyFilter(filter : string = 'all') {
    if (filter !== 'all') {
      this.tasks = this.allTasks.filter(task => task.category === this.selectedFilter)
    } else {
      this.tasks = this.allTasks;
    }
  }

  // Various getters
  get incompleteTasks() {
    return this.tasks.filter(task => !task.completed).length;
  }

  get completedTasks() {
    return this.tasks.filter(task => task.completed).length;
  }

  get progress() {
    return (this.completedTasks / this.tasks.length) * 100;
  }


}
