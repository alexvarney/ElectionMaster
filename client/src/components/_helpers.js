import moment from 'moment';

export const getPolling = (candidateId, contest) => {
    const sortedPolling = Array.from(contest.polling).sort((a,b) => (moment(a.date).format('YYYY-MM-DD') > moment(b.date).format('YYYY-MM-DD')) ? 1 : -1);

    let pollingResult = null;
    
    while(!pollingResult && sortedPolling.length > 0){
        pollingResult = sortedPolling.pop().values.filter(item => item.candidate === candidateId)[0];
    }

    return pollingResult ? pollingResult.value : null;

}

export const getSubtleColor = () => {
    const min = Math.ceil(0);
    const max = Math.floor(360);
    const randomVal = Math.floor(Math.random() * (max - min + 1)) + min; 
    return `hsla(${randomVal},42%,22%,1.0)`;
}