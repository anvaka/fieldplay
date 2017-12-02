import createInputCollection from './programs/inputs/inputCollection';
import createVideoInput from './programs/inputs/videoInput';
import createImageInputBinding from './programs/inputs/imageInput';

// Allows to bind media elements to vector field
export default function createInputsModel(ctx) {
  var inputs = createInputCollection();
  ctx.inputs = inputs;

  var api = {
    setBinding
  };

  return api;

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