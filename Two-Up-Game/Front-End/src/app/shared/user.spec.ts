import { user } from "./user";

describe('user', () => {
  let testUser: user;
  beforeEach(() => {
    testUser = new user();
  });

  describe('deserialize', () => {
    it('should deserialize the username correctly', () => {
      const input = [{ username: 'testuser', score: '42' }];
      testUser.deserialize(input);
      expect(testUser.username).toEqual('testuser');
    });

    it('should deserialize the score correctly', () => {
      const input = [{ username: 'testuser', score: '42' }];
      testUser.deserialize(input);
      expect(testUser.score).toEqual(42);
    });

    it('should deserialize the favourite colour correctly when provided', () => {
      const input = [{ username: 'testuser', score: '42', favColourHex: '#123456' }];
      testUser.deserialize(input);
      expect(testUser.favColourHex).toEqual('#123456');
    });

    it('should set the favourite colour to #FFFFFF if not provided', () => {
      const input = [{ username: 'testuser', score: '42' }];
      testUser.deserialize(input);
      expect(testUser.favColourHex).toEqual('#FFFFFF');
    });
  });
});
