import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class ResetPasswordComponent implements OnInit {
  constructor(private activateRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const token = this.activateRoute.snapshot.params['token'];
    console.log(token);
  }
}
