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
      let pins = [];
      return $q( (resolve, reject) => {
        $http.get(`${FBCreds.URL}/pins.json?orderBy="boardid"&equalTo="${currentBoardId}"`)
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
      $http.get(`${FBCreds.URL}/boards.json?orderBy="uid"&equalTo="${AuthFactory.getUser()}"`)
      .success( (boardsObj) => {
        console.log("boardsObj", boardsObj);
        currentBoardId = Object.keys(boardsObj)[0];
        Object.keys(boardsObj).forEach(function(key) {
          // boards.push(boardsObj[key]);
        });
        // console.log("boards: ", boards);
        resolve (currentBoardId);
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
        newBoard.uid = AuthFactory.getUser();
        let newBoardId = ObjFromFirebase.name;
        $http.put(`${FBCreds.URL}/boards/${newBoardId}.json`, newBoard);
        resolve(ObjFromFirebase);
      })
      .error( (error) => {
        reject(error);
      });
    });
  };

  let addPin = (newPin) => {
    return $q( (resolve, reject) => {
      console.log("newPin", newPin);
      $http.post(`${FBCreds.URL}/pins.json`, JSON.stringify(newPin))
      .success( (ObjFromFirebase) => {
        newPin.uid = AuthFactory.getUser();
        console.log("Is this the whole object?", currentBoardId);
        newPin.boardid = currentBoardId;
        let newPinId = ObjFromFirebase.name;
        $http.put(`${FBCreds.URL}/pins/${newPinId}.json`, newPin);
        console.log("newPinId", newPinId);
        resolve(ObjFromFirebase);
      })
      .error( (error) => {
        reject(error);
      });
    });
  };


  return {getPins, getBoards, addBoard, addPin};

});