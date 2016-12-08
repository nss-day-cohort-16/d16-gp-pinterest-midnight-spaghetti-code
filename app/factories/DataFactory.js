"use strict";

app.factory("DataFactory", ($http, $q, FBCreds, AuthFactory) => {

    let currentBoardId = null;

    let getPins = (boardId) => {
        let pins = [];
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.URL}/pins.json?orderBy="boardid"&equalTo="${currentBoardId}"`)
                .success((pinsObj) => {
                    Object.keys(pinsObj).forEach(function(key) {
                        pins.push(pinsObj[key]);
                    });
                    resolve(pins);
                })
                .error((error) => {
                    reject(error);
                });
        });
    };

    let getBoards = () => {
        let boards = [];
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.URL}/boards.json?orderBy="uid"&equalTo="${AuthFactory.getUser()}"`)
                .success((boardsObj) => {
                    currentBoardId = Object.keys(boardsObj)[0];
                    resolve(boardsObj);
                })
                .error((error) => {
                    reject(error);
                });
        });
    };

    let addBoard = (newBoard) => {
        return $q((resolve, reject) => {
            $http.post(`${FBCreds.URL}/boards.json`, JSON.stringify(newBoard))
                .success((ObjFromFirebase) => {
                    newBoard.uid = AuthFactory.getUser();
                    let newBoardId = ObjFromFirebase.name;
                    let currentBoardId = newBoardId;
                    $http.put(`${FBCreds.URL}/boards/${newBoardId}.json`, newBoard);
                    resolve(ObjFromFirebase);
                })
                .error((error) => {
                    reject(error);
                });
        });
    };

    let addPin = (newPin) => {
        return $q((resolve, reject) => {
            $http.post(`${FBCreds.URL}/pins.json`, JSON.stringify(newPin))
                .success((ObjFromFirebase) => {
                    newPin.uid = AuthFactory.getUser();
                    newPin.boardid = currentBoardId;
                    let newPinId = ObjFromFirebase.name;
                    $http.put(`${FBCreds.URL}/pins/${newPinId}.json`, newPin);
                    resolve(ObjFromFirebase);
                })
                .error((error) => {
                    reject(error);
                });
        });
    };


    return {
        getPins,
        getBoards,
        addBoard,
        addPin
    };

});