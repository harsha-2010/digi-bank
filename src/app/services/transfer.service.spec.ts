import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { TransferService } from './transfer.service';

describe('TransferService', () => {
  let service: TransferService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [TransferService]
  }));

   it('should be created', () => {
    const service: TransferService = TestBed.get(TransferService);
    expect(service).toBeTruthy();
   });
});
