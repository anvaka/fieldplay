import createInputCollection from './programs/inputs/inputCollection';
import createVideoInput from './programs/inputs/videoInput';
import createImageInputBinding from './programs/inputs/imageInput';

// Allows to bind media elements to vector field
export default function createInputsModel(ctx) {
  ctx.inputs = createInputCollection();
  var inputs = [];

  var api = {
    getInputs,
    addInput,
    setBinding
  };

  return api;

  function getInputs() {
    return inputs;
  }

  function addInput() {
    inputs.push(createInputElementViewModel());
  }

  function setBinding(bindingNumber, bindingLink) {
    // TODO: Error checking
    var binding = createImageInputBinding(ctx, bindingLink, {
      done() {
        console.log('ok');
      },
      error(err) {
        console.log('error', err);
      }
    });
    inputs.bindInput(bindingNumber, binding);
  }
}

function createInputElementViewModel() {
  var input = {
    link: '',
    error: null,
    name: 'input0',
    updateBinding
  }

  return input;

  function updateBinding() {
    console.log(input.link);
  }
}