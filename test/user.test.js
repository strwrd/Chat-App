// Local Module
const { Users } = require('./../utils/user');

describe('Users', () => {
  let testUsers;

  beforeEach(() => {
    testUsers = new Users();
    testUsers.users = [
      {
        id: 1,
        name: 'User One',
        room: 'Room One',
      }, {
        id: 2,
        name: 'User Two',
        room: 'Room Two',
      }, {
        id: 3,
        name: 'User Three',
        room: 'Room One',
      }];
  });

  describe('addUser()', () => {
    test('Should add new user', () => {
      const users = new Users();
      const newUser = {
        id: 'unique',
        name: 'New User',
        room: 'Test Room',
      };

      const result = users.addUser(newUser.id, newUser.name, newUser.room);
      expect(users.users).toEqual([result]);
    });
  });

  describe('getUser()', () => {
    test('Should return User One Object', () => {
      const result = testUsers.getUser(1);
      expect(result).toEqual(testUsers.users[0]);
    });

    test('Should not return User Object', () => {
      const result = testUsers.getUser(999);
      expect(result).toBeFalsy();
    });
  });

  describe('getUserList()', () => {
    test('Should return names of Room One', () => {
      const result = testUsers.getUserList('Room One');
      expect(result).toEqual(['User One', 'User Three']);
    });

    test('Should return names of Room Two', () => {
      const result = testUsers.getUserList('Room Two');
      expect(result).toEqual(['User Two']);
    });
  });

  describe('removeUser()', () => {
    test('Should remove a User', () => {
      testUsers.removeUser(1);
      const deletedUser = testUsers.getUser(1);

      expect(testUsers.users.length).toBe(2);
      expect(deletedUser).toBeFalsy();
    });

    test('Should not remove a User', () => {
      const result = testUsers.removeUser(999);
      expect(testUsers.users.length).toBe(3);
      expect(result).toBeFalsy();
    });
  });
});
