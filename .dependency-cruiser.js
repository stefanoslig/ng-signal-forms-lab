/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
    name: "no-cross-domains",
    comment:
      "One library should not depend on another domain's library. Dependencies from shared are allowed.",
    severity: "error",
    from: {
      path: "^src/app/domains/(?!(shared))([^/]+)"
    },
    to: {
      path: "^src/app/domains/(?!(shared))",
      pathNot: "^src/app/domains/\$1"
    }
  },
  {
    name: 'data-access-lib-restricted-deps',
    comment:
      'Folders of type data-access should depend only on folders of type data-access, model or utils',
    severity: 'error',
    from: {
      path: '^src/app/domains/[^/]+/data-access'  
    },
    to: {
      path: '^src/app/domains/(?!(shared))',
      pathNot: '^src/app/domains/[^/]+/(?:data-access|model|utils)(?:/|$)'
    }
  },
  {
    name: 'ui-lib-restricted-deps',
    comment:
      'Folders of type ui should depend only on folders of type util, model or ui',
    severity: 'error',
    from: {
      path: '^src/app/domains/[^/]+/ui'  
    },
    to: {
      path: '^src/app/domains/(?!(shared))',
      pathNot: '^src/app/domains/[^/]+/(?:utils|model|ui)(?:/|$)'
    },
  },
  {
    name: 'model-lib-restricted-deps',
    comment:
      'Folders of type model should depend only on folders of type model',
    severity: 'error',
    from: {
      path: '^src/app/domains/[^/]+/model'  
    },
    to: {
      path: '^src/app/domains/(?!(shared))',
      pathNot: '^src/app/domains/[^/]+/(?:model)(?:/|$)'
    },
  },
  {
    name: 'util-lib-restricted-deps',
    comment:
      'Folders of type util should depend only on folders of type model or util',
    severity: 'error',
    from: {
      path: '^src/app/domains/[^/]+/util'  
    },
    to: {
      path: '^src/app/domains/(?!(shared))',
      pathNot: '^src/app/domains/[^/]+/(?:model|utils)(?:/|$)'
    },
  },
  {
    name: 'shell-lib-restricted-deps',
    comment:
      'Folders of type shell should depend only on folders of type shell, model, data-access or feature',
    severity: 'error',
    from: {
      path: '^src/app/domains/[^/]+/shell'  
    },
    to: {
      path: '^src/app/domains/(?!(shared))',
      pathNot: '^src/app/domains/[^/]+/(?:shell|data-access|model|feature-[^/]+)(?:/|$)'
    },
  },
  {
    name: 'feature-lib-restricted-deps',
    comment:
      'Folders of type feature should depend only on every type except shell',
    severity: 'error',
    from: {
      path: '^src/app/domains/[^/]+/feature-[^/]+'  
    },
    to: {
      path: '^src/app/domains/(?!(shared))',
      pathNot: '^src/app/domains/[^/]+/(?:feature-[^/]+|model|data-access|ui|utils)(?:/|$)'
    },
  },
    {
      name: 'no-circular',
      severity: 'warn',
      comment:
        'This dependency is part of a circular relationship. You might want to revise ' +
        'your solution (i.e. use dependency inversion, make sure the modules have a single responsibility) ',
      from: {},
      to: {
        circular: true
      }
    },
  ],
  options: {
    doNotFollow: {
      path: ['node_modules']
    },
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: 'tsconfig.app.json'
    },
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default", "types"],
      mainFields: ["main", "types", "typings"],
    },
    skipAnalysisNotInRules: true,
    
    reporterOptions: {
      dot: {
        collapsePattern: 'node_modules/(?:@[^/]+/[^/]+|[^/]+)',
      },
      archi: {
        collapsePattern: '^(?:packages|src|lib(s?)|app(s?)|bin|test(s?)|spec(s?))/[^/]+|node_modules/(?:@[^/]+/[^/]+|[^/]+)',
      },
      "text": {
        "highlightFocused": true
      },
    }
  }
};
