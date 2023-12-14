import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFormComponent } from './account-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccountService } from '../services/account.service';

describe('AccountFormComponent', () => {
  let component: AccountFormComponent;
  let fixture: ComponentFixture<AccountFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AccountFormComponent],
      providers: [AccountService],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    const component: AccountFormComponent = TestBed.get(AccountFormComponent);
    expect(component).toBeTruthy();
   });
});

