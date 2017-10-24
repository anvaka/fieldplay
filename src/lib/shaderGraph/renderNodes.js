
export default function renderNodes(nodes) {
  let code = [] 

  nodes.forEach(node => { if (node.getDefines) addToCode(node.getDefines()); });
  nodes.forEach(node => { if (node.getFunctions) addToCode(node.getFunctions()); });

  addToCode('void main() {')
    nodes.forEach(node => { if (node.getMainBody) addToCode(node.getMainBody()); });
  addToCode('}')
  return code.join('\n');

  function addToCode(line) {
    if (line) code.push(line)
  }
}
