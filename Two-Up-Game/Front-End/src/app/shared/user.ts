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
      console.log("Deserializing user: " + input[0]);
      this.username = input[0].username;
      console.log("Deserializing username: " + input[0].username);
      this.score = Number.parseInt(input[0].score);
      console.log("Deserializing score: " + input[0].score);

      console.log("Deserializing colour: " + input[0].favColourHex);

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
