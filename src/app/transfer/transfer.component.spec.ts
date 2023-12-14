import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferComponent } from './transfer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TransferService } from '../services/transfer.service';

describe('TransferComponent', () => {
  let component: TransferComponent;
  let fixture: ComponentFixture<TransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TransferComponent],
      providers: [TransferService],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    const component: TransferComponent = TestBed.get(TransferComponent);
    expect(component).toBeTruthy();
   });
});

 
