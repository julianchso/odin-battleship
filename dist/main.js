(()=>{var e={389:e=>{e.exports={Ship:class{constructor(e,t,i=0){this._shipName=e,this.length=t,this._damage=i,this.isSunk=!1}get shipName(){return this._shipName}receiveHit(){this._damage+=1}isSunk(){this.hit==this.length&&(this.isSunk=!0)}}}}},t={};function i(r){var s=t[r];if(void 0!==s)return s.exports;var h=t[r]={exports:{}};return e[r](h,h.exports,i),h.exports}(()=>{"use strict";var e=i(389);let t=new class{constructor(e,t){this.grid=[],this.missedAttacks=[],this.row=e,this.column=t,this.fleet=[]}createGrid(){for(let e=0;e<this.row;e++){this.grid[e]=[""];for(let t=0;t<this.column;t++)this.grid[e][t]=""}return this.grid}placeShip(t,i,r,s){let h=new e.Ship(t,i);const[o,a]=r;if("horizontal"==s){if(this.outOfBounds(i,a,this.column))return;for(let e=0;e<i;e++){if(""!==this.grid[o][a+e])return;this.grid[o][a+e]=t,console.log(`i: ${e}`)}}else if("vertical"==s){if(this.outOfBounds(i,o,this.row))return;for(let e=0;e<i;e++){if(""!==this.grid[o+e][a])return;this.grid[o+e][a]=t}}return this.addToFleet(h),this.grid}addToFleet(e){this.fleet.push(e)}outOfBounds(e,t,i){return console.log(e+t[0]>i),e+t[0]>i}rotateShip(){}receiveAttack(e){const[t,i]=e;switch(this.grid[t][i]){case"carrier":this.getship("carrier").receiveHit();break;case"battleship":this.getship("battleship").receiveHit();break;case"destroyer":this.getship("destroyer").receiveHit();break;case"submarine":this.getship("submarine").receiveHit();break;case"patrol boat":this.getship("patrol boat").receiveHit();break;default:this.grid[t][i]="miss"}}getship(e){return this.fleet.find((t=>t.shipName==e))}}(10,10),r=t.createGrid();console.log(r),t.placeShip("carrier",5,[0,0],"horizontal"),t.placeShip("battleship",4,[0,5],"horizontal"),t.placeShip("submarine",3,[1,5],"vertical"),t.placeShip("destroyer",3,[1,6],"vertical"),console.log(r),t.receiveAttack([0,0]),t.receiveAttack([6,0]),console.log(t.fleet),console.log(t)})()})();