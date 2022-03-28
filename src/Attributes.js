class Attribute {
  constructor(name, type, value, values) {
    this.name = name;
    this.type = type;
    this.value = value;
    this.values = values;
  }
}

class Attributes {
  constructor() {
    this.attributes = {};
  }

  fromDB(attributes) {
    attributes.forEach(attr =>
      this.attributes[attr.name] = new Attribute(attr.name, attr.type, attr.items[0].value,
        attr.items.map(item => item.value)));
  }

  fromAttributes(attributes) {
    Object.values(attributes).forEach(attr => {
      this.attributes[attr.name] = new Attribute(attr.name, attr.type, attr.value, attr.values);
    });
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
