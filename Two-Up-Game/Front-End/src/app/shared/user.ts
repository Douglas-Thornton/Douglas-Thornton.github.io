interface Serializable<T> {
  deserialize(input: Object): T;
}

/*
This class represents a user account from the database.
It does not store the users password.

*/
export class user implements Serializable<user> {

  username: string = "";
  score: number = 0;
  favColourHex: string = "";

  deserialize(input:any) {
      this.username = input[0].username;
      this.score = Number.parseInt(input[0].score);
      if(input[0].favColourHex == undefined)
      {
        this.favColourHex = "#FFFFFF"
      }
      else
      {
        this.favColourHex = input[0].favColourHex;
      }

      return this;
  }
}
