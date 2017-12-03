import Srqlock from './Srqlock';

const srqlock = new Srqlock();

document.addEventListener('DOMContentLoaded', srqlock.init.bind(srqlock), false);

if (module.hot)
{
    module.hot.accept();
}
