import axios from 'axios';

export function getHistoryData() {
    return new Promise((resolve)=>{
            const hubId = 'e90d7310-959c-4948-bf09-c67e93600848';
    const timeStart = 1617269963000;
    const timeEnd = 1617270048000;
    let value;
    axios.get(`https://api.ctirobot.com/api/aurora/v1/robot/status/history`,{
       params:{
           hubId,
           updateTimeEnd:timeEnd,
           updateTimeStart:timeStart
       }
    })
    .then(res => {
      value = res.data;
      let robotData :any = [];
      res.data.forEach((item:any)=>{
        if(item.id ==='9782394e-2b4f-495a-a119-ce6df12f458c' && item.level === 26){
            let {coordinates} = item;
            let [x,y] = calMapOriginDeviation(coordinates);
            item.position = [x,y];
            robotData.push(item)
        }
      })
    // console.log(robotData)
     resolve(robotData)
    })
    })

}
function calMapOriginDeviation (coordinates: any){
    //  let { coordinates } = robotOHistoryData[name][value
    let origin = [-38.61153, -18.267531];
    let resolution = 0.05 /2
    let imgHeight = 553 * 2;
    let imgWidth = 1140 * 2;
    let difwidth = 57.7 * 2;
    let difheight = 83 * 2;
    //解决地图原点误差
    let _x = (coordinates[0] - origin[0]) / resolution;
    let _y = (coordinates[1] - origin[1]) / resolution;
    let x = _x - imgWidth / 2 - difwidth;
    let y = _y - imgHeight / 2 - difheight;
    //解决canvas与地图的原点误差
    return [x, y];
  };