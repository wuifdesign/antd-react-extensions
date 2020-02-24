import ApiWrapper from './api-wrapper';

const api = new ApiWrapper();
const testData = 'testData';
const testError = { type: 'error', status: 404, reason: {} };
const testCancel = { type: 'cancel', status: undefined, reason: undefined };

describe('ApiWrapper', () => {
  it('should call with type: head', () => {
    expect.assertions(1);
    return api.head('/success').promise.then((data) => {
      expect(data).toEqual(testData);
    });
  });

  it('should call with type: get', () => {
    expect.assertions(1);
    return api.get('/success').promise.then((data) => {
      expect(data).toEqual(testData);
    });
  });

  it('should call with type: post', () => {
    expect.assertions(1);
    return api.post('/success').promise.then((data) => {
      expect(data).toEqual(testData);
    });
  });

  it('should call with type: postAsFormData', () => {
    expect.assertions(1);
    return api.postAsFormData('/success', { name: 'test' }).promise.then((data) => {
      expect(data).toEqual(testData);
    });
  });

  it('should call with type: put', () => {
    expect.assertions(1);
    return api.put('/success').promise.then((data) => {
      expect(data).toEqual(testData);
    });
  });

  it('should call with type: patch', () => {
    expect.assertions(1);
    return api.patch('/success').promise.then((data) => {
      expect(data).toEqual(testData);
    });
  });

  it('should call with type: delete', () => {
    expect.assertions(1);
    return api.delete('/success').promise.then((data) => {
      expect(data).toEqual(testData);
    });
  });

  it('should fail call', () => {
    expect.assertions(1);
    return api.get('/fail').promise.catch((data) => {
      expect(data).toEqual(testError);
    });
  });

  it('should cancel call', () => {
    expect.assertions(1);
    return api.get('/cancel').promise.catch((data) => {
      expect(data).toEqual(testCancel);
    });
  });
});
