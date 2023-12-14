import { TestBed } from '@angular/core/testing';
import { AccountService } from './account.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [AccountService]
  }));

   it('should be created', () => {
    const service: AccountService = TestBed.get(AccountService);
    expect(service).toBeTruthy();
   });
});
