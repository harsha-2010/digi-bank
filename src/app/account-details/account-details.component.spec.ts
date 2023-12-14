import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailsComponent } from './account-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccountService } from '../services/account.service';

describe('AccountDetailsComponent', () => {
  let component: AccountDetailsComponent;
  let fixture: ComponentFixture<AccountDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AccountDetailsComponent],
      providers: [AccountService],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    const component: AccountDetailsComponent = TestBed.get(AccountDetailsComponent);
    expect(component).toBeTruthy();
   });
});

