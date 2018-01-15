import createInputCollection from './programs/inputs/inputCollection';
import createVideoInput from './programs/inputs/videoInput';
import createImageInputBinding from './programs/inputs/imageInput';
import appState from './appState.js';

// Allows to bind media elements to vector field
export default function createInputsModel(ctx) {
  ctx.inputs = createInputCollection();
  var inputs = [];
  readInputsFromAppState();

  var api = {
    getInputs,
    addInput,
  };

  return api;

  function getInputs() {
    return inputs;
  }

  function addInput(inputNumber) {
    var vm = createInputElementViewModel(ctx, inputNumber);
    inputs.push(vm);
    return vm;
  }

  function readInputsFromAppState() {
    var i0 = appState.getQS().get('i0');
    if (i0) {
      var vm = addInput(0);
      vm.link = i0;
      vm.updateBinding(/* immediate = */ true);
    }
  }
}

function createInputElementViewModel(ctx, inputNumber) {
  var pendingUpdate = null;

  var input = {
    link: '',
    error: null,
    name: `input${inputNumber}`,
    updateBinding
  }

  return input;

  function updateBinding(immediate) {
    if (pendingUpdate) {
      clearTimeout(pendingUpdate);
      pendingUpdate = null;
    }

    if (immediate) {
      setBinding();
    } else {
      pendingUpdate = setTimeout(setBinding, 300);
    }
  }

  function setBinding() {
    input.error = null;
    pendingUpdate = null;
    var binding = createImageInputBinding(ctx, input.link, {
      done() {
        // TODO: Preview
        appState.getQS().set(`i${inputNumber}`, input.link);
      },
      error(err) {
        // TODO: Better Error checking
        input.error = err;
      }
    });
    ctx.inputs.bindInput(0, binding);
  }
}