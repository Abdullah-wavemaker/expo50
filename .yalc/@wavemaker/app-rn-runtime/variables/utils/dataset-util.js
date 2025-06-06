import { isUndefined, isBoolean, isEqual, isObject, isArray, get, set, findIndex } from "lodash";
export default class DatasetUtil {
  static isValidDataset(dataSet, isList) {
    if (!dataSet || isList && !isArray(dataSet)) {
      return false;
    }
    return dataSet;
  }
  static getValue(dataSet, key, index, isList) {
    index = index || 0;
    return isList ? dataSet[index][key] : dataSet[key];
  }
  static setValue(dataSet, key, value, isList) {
    if (key && !isList) {
      dataSet[key] = value;
    }
    return dataSet;
  }
  static getTargetNode(dataSet, options) {
    dataSet = options.parentIndex !== undefined ? dataSet[options.parentIndex] : dataSet;
    return get(dataSet, options.path);
  }
  static getItem(dataSet, index, isList) {
    return isList ? dataSet[index] : dataSet;
  }
  static setItem(dataSet, i, value, options) {
    let index;
    if (isUndefined(i) || !options.isList) {
      return dataSet;
    }
    if (isObject(i)) {
      index = findIndex(dataSet, i);
    } else {
      index = i;
    }
    if (options.path) {
      const innerArray = DatasetUtil.getTargetNode(dataSet, options);
      const innerElemindex = findIndex(innerArray, i);
      if (innerElemindex > -1) {
        innerArray[innerElemindex] = value;
      }
    } else {
      if (index > -1) {
        dataSet[index] = value;
      }
    }
    return dataSet;
  }

  /**
   * This method is to get target node options like path, parentIndex and isList
   * Example: if we have parent dataset as object and we are performing operations on inner list then we have to set isList as true.
   * So finding the target node type and updating the isList option.
   */
  static getChildDetails(dataSet, options, isList) {
    let parentIndex, path;
    if (options && options.path) {
      path = options.path;
      let targetNode;
      if (isList) {
        parentIndex = options.parentIndex || 0;
        targetNode = get(dataSet[parentIndex], options.path);
      } else {
        targetNode = get(dataSet, options.path);
      }
      isList = targetNode ? isArray(targetNode) ? true : false : true;
    }
    return {
      path,
      isList,
      parentIndex
    };
  }
  static addItem(dataSet, value, index, options) {
    if (isUndefined(value) || !options.isList) {
      return dataSet;
    }
    if (options.path) {
      const innerArray = DatasetUtil.getTargetNode(dataSet, options);
      if (innerArray) {
        // check for index sanity
        index = index !== undefined ? index : innerArray.length;
        innerArray.splice(index, 0, value);
      } else {
        options.parentIndex !== undefined ? set(dataSet[options.parentIndex], options.path, [value]) : set(dataSet, options.path, [value]);
      }
    } else {
      index = index !== undefined ? index : dataSet.length;
      dataSet.splice(index, 0, value);
    }
    return dataSet;
  }

  /**
   *
   * @param dataSet
   * @param i, can be index value of the object/element in array
   *      or
   * the whole object which needs to be removed
   * @param exactMatch
   * @returns {any}
   */
  static removeItem(dataSet, i, options) {
    let index, exactMatch;
    i = i !== undefined ? i : dataSet.length - 1;
    if (isBoolean(options)) {
      exactMatch = options;
    }
    if (isObject(options)) {
      // @ts-ignore
      exactMatch = options.exactMatch;
    }
    if (isObject(i)) {
      if (options.path) {
        const innerArray = DatasetUtil.getTargetNode(dataSet, options);
        const innerElemindex = findIndex(innerArray, i);
        if (innerElemindex > -1 && (!exactMatch || exactMatch && isEqual(innerArray[innerElemindex], i))) {
          innerArray.splice(innerElemindex, 1);
        }
      } else {
        index = findIndex(dataSet, i);
        // When exactMatch property is set to true delete only when every property values are same*/
        if (index > -1 && (!exactMatch || exactMatch && isEqual(dataSet[index], i))) {
          dataSet.splice(index, 1);
        }
      }
    } else {
      dataSet.splice(i, 1);
    }
    return dataSet;
  }
  static getValidDataset(isList) {
    return isList ? [] : {};
  }
  static getCount(dataSet, isList) {
    return isList ? dataSet.length : Object.keys(dataSet).length;
  }
}
//# sourceMappingURL=dataset-util.js.map