import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFtpComponent } from './dialog-ftp.component';

describe('DialogFtpComponent', () => {
  let component: DialogFtpComponent;
  let fixture: ComponentFixture<DialogFtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
