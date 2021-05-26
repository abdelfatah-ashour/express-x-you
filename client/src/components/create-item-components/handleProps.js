export function PropsOfField(typeSection, label, optionList, handleChange) {
  this.name = typeSection;
  this.id = typeSection;
  this.label = label;
  this.areaLabel = `select ${typeSection}`;
  this.selectOptions = optionList;
  this.handleChange = handleChange;
}
