export default function enumerable(target, name, descriptor) {
  descriptor.enumerable = true;
  return descriptor;
}