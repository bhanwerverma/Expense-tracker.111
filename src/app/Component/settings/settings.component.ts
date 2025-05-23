import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  imports: [NgFor, FormsModule]
})
export class SettingsComponent implements OnInit {
  user = { name: '', email: '' }; // Replace with actual user profile logic if needed
  budgets: any[] = [];
  settings = { currency: 'INR', darkMode: false };
  private settingsId = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchSettings();
    this.fetchBudgets();
  }

  fetchSettings() {
    this.http.get<any[]>('http://localhost:3000/settings').subscribe(data => {
      if (data.length) {
        const setting = data[0];
        this.settings = {
          currency: setting.currency || 'INR',
          darkMode: setting.theme === 'dark'
        };
        this.applyTheme();
        this.settingsId = setting.id;
      }
    });
  }

  fetchBudgets() {
    this.http.get<any[]>('http://localhost:3000/Budget').subscribe(data => {
      this.budgets = data.map(b => ({
        id: b.id,
        name: b.Category,
        amount: b.amount
      }));
    });
  }

  updateProfile() {
    console.log('Profile updated:', this.user);
    alert('Profile updated!');
  }

  updateBudgets() {
    this.budgets.forEach(budget => {
      this.http.patch(`http://localhost:3000/Budget/${budget.id}`, {
        amount: budget.amount
      }).subscribe();
    });
    alert('Budgets updated!');
  }

 updateSettings() {
  const updatedSettings = {
    currency: this.settings.currency,
    theme: this.settings.darkMode ? 'dark' : 'light'
  };

  this.http.patch(`http://localhost:3000/settings/${this.settingsId}`, updatedSettings)
    .subscribe(() => {
      this.applyTheme();
      alert('Settings saved!');
    });
    this.applyTheme()
}
applyTheme() {
  if (this.settings.darkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}


  deleteAccount() {
    if (confirm('Are you sure you want to delete your account?')) {
      console.log('Deleting account...');
      alert('Account deleted (simulated)');
    }
  }

  logout() {
    console.log('Logging out...');
    alert('Logged out!');
  }
}
