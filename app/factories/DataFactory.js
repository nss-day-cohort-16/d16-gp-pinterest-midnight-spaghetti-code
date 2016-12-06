/*
 App
  |
  + users
  |---+ -K84hddnjx9v
  |   |--- uid: "github:jruhfiurnvuienciuwdn"
  |   |--- name: "Abraham Ybrimovitz"
  |
  + pins
  |---+ -K84hfurycvb
  |   |--- uid: "github:jruhfiurnvuienciuwdn"
  |   |--- boardid: "-K66hzzzyyyy"
  |   |--- url: "http://www.imgur.com/9rufrniuvnfu2vnefui"
  |   |--- title: "Ha ha, stupid gator"
  |
  + boards
  |---+ -K66hzzzyyyy
  |   |--- uid: "github:jruhfiurnvuienciuwdn"
  |   |--- title: "Stupid animals"
 */

"use strict";

app.factory("DataFactory", ($http, $q, FBCreds, AuthFactory) =>  {

  let currentBoardId = null;

  let getPins = (boardId) => {
      currentBoardId = boardId;
      let pins = [];
      return $q( (resolve, reject) => {
        $http.get(`${FBCreds.URL}/pins.json?orderBy="boardid"&equalTo="${boardId}"`)
          .success( (pinsObj) => {
            console.log("pinsObj", pinsObj);
            Object.keys(pinsObj).forEach(function(key) {
              pins.push(pinsObj[key]);
            });
            resolve (pins);
          })
          .error( (error) => {
            reject(error);
          });
      });
  };

  let getBoards = () => {
    let boards = [];
    return $q( (resolve, reject) => {
      $http.get(`${FBCreds.URL}/boards.json?orderBy="uid"&equalTo="${AuthFactory.AuthObject.getUser()}"`)
      .success( (boardsObj) => {
        Object.keys(boardsObj).forEach(function(key) {
          boards.push(boardsObj[key]);
        });
        console.log("boards: ", boards);
        resolve (boards);
      })
      .error( (error) => {
        reject(error);
      });
    });
  };

  let addBoard = (newBoard) => {
    return $q( (resolve, reject) => {
      $http.post(`${FBCreds.URL}/boards.json`, JSON.stringify(newBoard))
      .success( (ObjFromFirebase) => {
        let newBoardId = ObjFromFirebase.name;
        newBoard.boardid = newBoardId;
        $http.put(`${FBCreds.URL}/board/${newBoardId}.json`, newBoard);
        resolve(ObjFromFirebase);
      })
      .error( (error) => {
        reject(error);
      });
    });
  };

  let addPin = (newPin) => {
    return $q( (resolve, reject) => {
      $http.post(`${FBCreds.URL}/pins.json`, JSON.stringify(newPin))
      .success( (ObjFromFirebase) => {
        let newPinId = ObjFromFirebase.name;
        newPinId.pinId = newPinId;
        $http.put(`${FBCreds.URL}/pin/${newPinId}.json`, newPin);
        resolve(ObjFromFirebase);
      })
      .error( (error) => {
        reject(error);
      });
    });
  };


  return {getPins, getBoards, addBoard, addPin};

});