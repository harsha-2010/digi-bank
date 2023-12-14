import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSummaryComponent } from './account-summary.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccountService } from '../services/account.service';

describe('AccountSummaryComponent', () => {
  let component: AccountSummaryComponent;
  let fixture: ComponentFixture<AccountSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AccountSummaryComponent],
      providers: [AccountService],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    const component: AccountSummaryComponent = TestBed.get(AccountSummaryComponent);
    expect(component).toBeTruthy();
   });
});
