(()=>{var t={389:t=>{t.exports={Ship:class{constructor(t,e,i=0){this._shipName=t,this.length=e,this._damage=i,this.isSunk=!1}get shipName(){return this._shipName}receiveHit(){this._damage+=1,this._damage==this.length&&this.sunk()}sunk(){this.isSunk=!0}getSunk(){return this.isSunk}}}}},e={};function i(s){var r=e[s];if(void 0!==r)return r.exports;var h=e[s]={exports:{}};return t[s](h,h.exports,i),h.exports}(()=>{"use strict";var t=i(389);const e=class{constructor(){this.grid=[],this.missedAttacks=[],this.fleet=[]}createGrid(){for(let t=0;t<10;t++){this.grid[t]=[""];for(let e=0;e<10;e++)this.grid[t][e]=""}return this.grid}placeShip(e,i,s,r){let h=new t.Ship(e,i);const[a,o]=s;if("horizontal"==r){if(this.outOfBounds(i,o,this.column))return;for(let t=0;t<i;t++){if(""!==this.grid[a][o+t])return;this.grid[a][o+t]=e}}else if("vertical"==r){if(this.outOfBounds(i,a,this.row))return;for(let t=0;t<i;t++){if(""!==this.grid[a+t][o])return;this.grid[a+t][o]=e}}return this.addToFleet(h),console.log(this.grid),this.grid}addToFleet(t){this.fleet.push(t)}outOfBounds(t,e,i){return t+e[0]>i}rotateShip(t){return"vertical"==t?"horizontal":"vertical"}receiveAttack(t){const[e,i]=t;switch(this.grid[e][i]){case"carrier":this.getship("carrier").receiveHit();break;case"battleship":this.getship("battleship").receiveHit();break;case"destroyer":this.getship("destroyer").receiveHit();break;case"submarine":this.getship("submarine").receiveHit();break;case"patrol boat":this.getship("patrol boat").receiveHit();break;default:this.grid[e][i]="miss",this.missedAttacks.push([e,i])}}getship(t){return this.fleet.find((e=>e.shipName==t))}allSunk(){return this.fleet.every((function(){this.getSunk()}))}};let s=new class{constructor(t){this.name=t,this.playerMoves=new e,this.map=this.playerMoves.createGrid()}shoot(){""==cpu.map&&cpu.map}recordPreviousShot(t){}};s.playerMoves.placeShip("carrier",5,[0,0],"vertical"),s.playerMoves.placeShip("battleship",4,[5,0],"vertical")})()})();