import Notiflix from 'notiflix';

const form = document.querySelector('.form')

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onCreatePromises(e) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const dataParams = {};

  for (const [key, value] of formData.entries()) {
    dataParams[key] = Number(value);
  }

  let { amount, step, delay } = dataParams;

  for (let i = 1; i <= amount; i += 1) {
    delay += step;
    createPromise(i, delay).then(onSuccess).catch(onError);

    form.reset();
  }
}

function onError({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

function onSuccess({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

form.addEventListener('submit', onCreatePromises);