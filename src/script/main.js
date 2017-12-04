import Srqlock from './Srqlock';

let srqlock = new Srqlock();

document.addEventListener('DOMContentLoaded', srqlock.init.bind(srqlock), false);

if (module.hot)
{
    module.hot.accept('./Srqlock', () =>
    {
        srqlock.tearDown();
        srqlock = new Srqlock();
        srqlock.init();
    });
}
