import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutComponent } from './logout.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccountService } from '../services/account.service';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LogoutComponent],
      providers: [AccountService],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    const component: LogoutComponent = TestBed.get(LogoutComponent);
    expect(component).toBeTruthy();
   });
});
