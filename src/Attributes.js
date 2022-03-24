class Attribute {
  constructor(name, type, items) {
    this.name = name;
    this.type = type;
    this.value = items[0].value;
    this.values = items.map(item => item.value);
  }
}

class Attributes {
  constructor(attributes) {
    this.attributes = {};
    attributes.forEach(attr =>
      this.attributes[attr.name] = new Attribute(attr.name, attr.type, attr.items));
  }

  selectAttribute(name, value) {
    this.attributes[name].value = value;
  }

  getSelectedAttribute(name) {
    return this.attributes[name].value;
  }

  getAttributes() {
    return Object.values(this.attributes);
  }

  id() {
    let id = '';
    Object.values(this.attributes).forEach((attribute) => {
      id += attribute.name.charAt(0);
      id += attribute.values.findIndex(value => value === attribute.value).toString();
    })
    return id;
  }
}

export default Attributes;
