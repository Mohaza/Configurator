import { ApplicationDataInstance } from './application-data-instance';

describe('ApplicationDataInstance', () => {
  it('should create an instance', () => {
    expect(new ApplicationDataInstance(Object(),0,"","")).toBeTruthy();
  });
});
