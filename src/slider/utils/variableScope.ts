import { getReferenceExpressValue } from "./express";

export interface VariableScopeManager {
  pushScope(scope: Record<string, any>): void;
  popScope(): void;
  getExpressValue(expressStr: string, localScopes?: Record<string, any>): any
  getExpressValues(keys: string[], fromObject: Record<string, any>, localScopes?: Record<string, any>): Record<string, any>
}

export function createVariableScopeManager(initScope?: Record<string, any>) {
  const scopes: Record<string, any>[] = initScope ? [ initScope ] : [];
  let currentMergedScopes: Record<string, any> = {};

  const updateCurrentMergedScopes = () => {
    currentMergedScopes = scopes.reduce((map, scope) => {
      return {
        ...map,
        ...scope,
      }
    }, {});
  };

  updateCurrentMergedScopes();

  return {
    pushScope(scope: Record<string, any>) {
      scopes.push(scope);
      updateCurrentMergedScopes();
    },
    popScope() {
      scopes.pop();
      updateCurrentMergedScopes();
    },
    getExpressValue(expressStr: string, localScopes?: Record<string, any>): any {
      return getReferenceExpressValue(expressStr, {
        ...currentMergedScopes,
        ...localScopes,
      })
    },
    getExpressValues(keys: string[], fromObject: Record<string, any>, localScopes?: Record<string, any>): Record<string, any> {
      return keys.reduce((map, key) => {
        map[key] = getReferenceExpressValue(fromObject[key], {
          ...currentMergedScopes,
          ...localScopes,
        })
        return map;
      }, {} as Record<string, any>);
    }
  }
}


