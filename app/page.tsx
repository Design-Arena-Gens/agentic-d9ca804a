'use client';

import { useState } from 'react';
import { Network, Users, Workflow, GitBranch, Layers, ChevronRight, PlayCircle } from 'lucide-react';

const architectures = [
  {
    id: 'hierarchical',
    name: 'Hierarchical',
    icon: Layers,
    description: 'Manager agent coordinates worker agents',
    use_cases: ['Complex task decomposition', 'Resource allocation', 'Quality control'],
    diagram: {
      nodes: [
        { id: 'manager', label: 'Manager Agent', x: 50, y: 10, color: 'bg-purple-500' },
        { id: 'worker1', label: 'Worker 1', x: 20, y: 60, color: 'bg-blue-500' },
        { id: 'worker2', label: 'Worker 2', x: 50, y: 60, color: 'bg-blue-500' },
        { id: 'worker3', label: 'Worker 3', x: 80, y: 60, color: 'bg-blue-500' },
      ],
      edges: [
        { from: 'manager', to: 'worker1' },
        { from: 'manager', to: 'worker2' },
        { from: 'manager', to: 'worker3' },
      ]
    },
    example: `// Manager Agent
class ManagerAgent {
  async delegateTask(task) {
    const subtasks = this.decompose(task);
    const workers = this.selectWorkers(subtasks);
    const results = await Promise.all(
      workers.map(w => w.execute())
    );
    return this.synthesize(results);
  }
}

// Worker Agent
class WorkerAgent {
  async execute(subtask) {
    return await this.process(subtask);
  }
}`
  },
  {
    id: 'sequential',
    name: 'Sequential Pipeline',
    icon: ChevronRight,
    description: 'Agents process tasks in a defined sequence',
    use_cases: ['Data processing pipelines', 'Multi-step workflows', 'Content generation'],
    diagram: {
      nodes: [
        { id: 'agent1', label: 'Agent 1\nData Collection', x: 10, y: 35, color: 'bg-green-500' },
        { id: 'agent2', label: 'Agent 2\nProcessing', x: 40, y: 35, color: 'bg-green-500' },
        { id: 'agent3', label: 'Agent 3\nValidation', x: 70, y: 35, color: 'bg-green-500' },
      ],
      edges: [
        { from: 'agent1', to: 'agent2' },
        { from: 'agent2', to: 'agent3' },
      ]
    },
    example: `// Pipeline Pattern
class Pipeline {
  constructor(agents) {
    this.agents = agents;
  }

  async execute(input) {
    let result = input;
    for (const agent of this.agents) {
      result = await agent.process(result);
      if (!result.success) break;
    }
    return result;
  }
}

const pipeline = new Pipeline([
  new DataCollectorAgent(),
  new ProcessorAgent(),
  new ValidatorAgent()
]);`
  },
  {
    id: 'collaborative',
    name: 'Collaborative/Peer',
    icon: Users,
    description: 'Agents work together as equals, sharing information',
    use_cases: ['Brainstorming', 'Consensus building', 'Multi-perspective analysis'],
    diagram: {
      nodes: [
        { id: 'agent1', label: 'Agent 1', x: 30, y: 20, color: 'bg-orange-500' },
        { id: 'agent2', label: 'Agent 2', x: 70, y: 20, color: 'bg-orange-500' },
        { id: 'agent3', label: 'Agent 3', x: 30, y: 60, color: 'bg-orange-500' },
        { id: 'agent4', label: 'Agent 4', x: 70, y: 60, color: 'bg-orange-500' },
      ],
      edges: [
        { from: 'agent1', to: 'agent2', bidirectional: true },
        { from: 'agent1', to: 'agent3', bidirectional: true },
        { from: 'agent2', to: 'agent4', bidirectional: true },
        { from: 'agent3', to: 'agent4', bidirectional: true },
      ]
    },
    example: `// Collaborative Pattern
class CollaborativeSystem {
  constructor(agents) {
    this.agents = agents;
    this.sharedMemory = new Map();
  }

  async solve(problem) {
    // All agents contribute
    const proposals = await Promise.all(
      this.agents.map(a => a.propose(problem))
    );

    // Agents discuss and refine
    for (let round = 0; round < 3; round++) {
      for (const agent of this.agents) {
        await agent.review(proposals);
      }
    }

    return this.buildConsensus(proposals);
  }
}`
  },
  {
    id: 'router',
    name: 'Router/Dispatcher',
    icon: GitBranch,
    description: 'Central router directs tasks to specialized agents',
    use_cases: ['Task classification', 'Load balancing', 'Specialized processing'],
    diagram: {
      nodes: [
        { id: 'router', label: 'Router', x: 50, y: 20, color: 'bg-red-500' },
        { id: 'specialist1', label: 'Code Agent', x: 15, y: 60, color: 'bg-cyan-500' },
        { id: 'specialist2', label: 'Data Agent', x: 40, y: 60, color: 'bg-cyan-500' },
        { id: 'specialist3', label: 'Vision Agent', x: 65, y: 60, color: 'bg-cyan-500' },
        { id: 'specialist4', label: 'Text Agent', x: 90, y: 60, color: 'bg-cyan-500' },
      ],
      edges: [
        { from: 'router', to: 'specialist1' },
        { from: 'router', to: 'specialist2' },
        { from: 'router', to: 'specialist3' },
        { from: 'router', to: 'specialist4' },
      ]
    },
    example: `// Router Pattern
class RouterAgent {
  constructor() {
    this.specialists = {
      code: new CodeAgent(),
      data: new DataAgent(),
      vision: new VisionAgent(),
      text: new TextAgent()
    };
  }

  async route(task) {
    const taskType = this.classify(task);
    const agent = this.specialists[taskType];

    if (!agent) {
      throw new Error('No specialist found');
    }

    return await agent.execute(task);
  }

  classify(task) {
    // Classification logic
    if (task.includes('code')) return 'code';
    if (task.includes('analyze')) return 'data';
    // ... more rules
  }
}`
  },
  {
    id: 'hybrid',
    name: 'Hybrid/Multi-Layer',
    icon: Network,
    description: 'Combines multiple patterns for complex systems',
    use_cases: ['Enterprise systems', 'Complex workflows', 'Adaptive systems'],
    diagram: {
      nodes: [
        { id: 'orchestrator', label: 'Orchestrator', x: 50, y: 5, color: 'bg-purple-600' },
        { id: 'router', label: 'Router', x: 50, y: 25, color: 'bg-red-500' },
        { id: 'team1', label: 'Team 1', x: 25, y: 50, color: 'bg-blue-400' },
        { id: 'team2', label: 'Team 2', x: 75, y: 50, color: 'bg-blue-400' },
        { id: 'worker1', label: 'W1', x: 15, y: 75, color: 'bg-green-400' },
        { id: 'worker2', label: 'W2', x: 35, y: 75, color: 'bg-green-400' },
        { id: 'worker3', label: 'W3', x: 65, y: 75, color: 'bg-green-400' },
        { id: 'worker4', label: 'W4', x: 85, y: 75, color: 'bg-green-400' },
      ],
      edges: [
        { from: 'orchestrator', to: 'router' },
        { from: 'router', to: 'team1' },
        { from: 'router', to: 'team2' },
        { from: 'team1', to: 'worker1' },
        { from: 'team1', to: 'worker2' },
        { from: 'team2', to: 'worker3' },
        { from: 'team2', to: 'worker4' },
      ]
    },
    example: `// Hybrid Pattern
class HybridSystem {
  constructor() {
    this.orchestrator = new OrchestratorAgent();
    this.router = new RouterAgent();
    this.teams = [
      new TeamManager([
        new WorkerAgent('w1'),
        new WorkerAgent('w2')
      ]),
      new TeamManager([
        new WorkerAgent('w3'),
        new WorkerAgent('w4')
      ])
    ];
  }

  async execute(complexTask) {
    // High-level orchestration
    const plan = await this.orchestrator
      .createPlan(complexTask);

    // Route to appropriate teams
    const teamTasks = await this.router
      .distribute(plan.tasks);

    // Teams execute in parallel
    const results = await Promise.all(
      teamTasks.map((task, i) =>
        this.teams[i].execute(task)
      )
    );

    // Orchestrator synthesizes
    return this.orchestrator
      .synthesize(results);
  }
}`
  }
];

const designPrinciples = [
  {
    title: 'Communication Protocol',
    points: [
      'Define clear message formats (JSON, Protocol Buffers)',
      'Use standardized schemas for inter-agent communication',
      'Implement request-response and pub-sub patterns',
      'Handle timeouts and retries gracefully'
    ]
  },
  {
    title: 'State Management',
    points: [
      'Decide between stateful and stateless agents',
      'Use shared memory for collaboration',
      'Implement state persistence for fault tolerance',
      'Consider event sourcing for audit trails'
    ]
  },
  {
    title: 'Error Handling',
    points: [
      'Implement circuit breakers for failing agents',
      'Use exponential backoff for retries',
      'Graceful degradation when agents are unavailable',
      'Centralized logging and monitoring'
    ]
  },
  {
    title: 'Scalability',
    points: [
      'Design for horizontal scaling',
      'Use load balancers for agent pools',
      'Implement agent lifecycle management',
      'Monitor resource usage and performance'
    ]
  }
];

export default function Home() {
  const [selectedArchitecture, setSelectedArchitecture] = useState(architectures[0]);
  const [showSimulation, setShowSimulation] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Network className="w-12 h-12 text-cyan-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Multi-Agent System Design
            </h1>
          </div>
          <p className="text-xl text-slate-300">
            Interactive guide to designing and implementing multi-agent architectures
          </p>
        </header>

        {/* Architecture Selector */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Workflow className="w-6 h-6" />
            Architecture Patterns
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {architectures.map((arch) => {
              const Icon = arch.icon;
              return (
                <button
                  key={arch.id}
                  onClick={() => {
                    setSelectedArchitecture(arch);
                    setShowSimulation(false);
                  }}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedArchitecture.id === arch.id
                      ? 'border-cyan-400 bg-slate-800 shadow-lg shadow-cyan-400/20'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-6 h-6 text-cyan-400" />
                    <h3 className="font-bold text-lg">{arch.name}</h3>
                  </div>
                  <p className="text-sm text-slate-400">{arch.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Architecture Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Diagram */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
              Architecture Diagram
              <button
                onClick={() => setShowSimulation(!showSimulation)}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded text-sm transition-colors"
              >
                <PlayCircle className="w-4 h-4" />
                {showSimulation ? 'Stop' : 'Simulate'}
              </button>
            </h3>
            <div className="relative bg-slate-900 rounded p-4 h-96">
              <svg className="w-full h-full">
                {/* Draw edges */}
                {selectedArchitecture.diagram.edges.map((edge, i) => {
                  const fromNode = selectedArchitecture.diagram.nodes.find(n => n.id === edge.from);
                  const toNode = selectedArchitecture.diagram.nodes.find(n => n.id === edge.to);
                  if (!fromNode || !toNode) return null;

                  const x1 = `${fromNode.x}%`;
                  const y1 = `${fromNode.y + 5}%`;
                  const x2 = `${toNode.x}%`;
                  const y2 = `${toNode.y - 5}%`;
                  const isBidirectional = 'bidirectional' in edge ? edge.bidirectional : false;

                  return (
                    <g key={i}>
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={showSimulation ? '#22d3ee' : '#475569'}
                        strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                        className={showSimulation ? 'animate-pulse' : ''}
                      />
                      {isBidirectional && (
                        <line
                          x1={x2}
                          y1={y2}
                          x2={x1}
                          y2={y1}
                          stroke={showSimulation ? '#22d3ee' : '#475569'}
                          strokeWidth="2"
                          markerEnd="url(#arrowhead)"
                          className={showSimulation ? 'animate-pulse' : ''}
                          strokeDasharray="4"
                        />
                      )}
                    </g>
                  );
                })}

                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                  >
                    <polygon
                      points="0 0, 10 3, 0 6"
                      fill={showSimulation ? '#22d3ee' : '#475569'}
                    />
                  </marker>
                </defs>
              </svg>

              {/* Draw nodes */}
              {selectedArchitecture.diagram.nodes.map((node) => (
                <div
                  key={node.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${node.color} rounded-lg px-4 py-2 text-sm font-medium text-white shadow-lg ${
                    showSimulation ? 'animate-bounce' : ''
                  }`}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  {node.label}
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-bold mb-4">Details</h3>

            <div className="mb-6">
              <h4 className="font-semibold text-cyan-400 mb-2">Description</h4>
              <p className="text-slate-300">{selectedArchitecture.description}</p>
            </div>

            <div>
              <h4 className="font-semibold text-cyan-400 mb-2">Use Cases</h4>
              <ul className="space-y-2">
                {selectedArchitecture.use_cases.map((useCase, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span className="text-slate-300">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-8">
          <h3 className="text-xl font-bold mb-4">Implementation Example</h3>
          <pre className="bg-slate-900 rounded p-4 overflow-x-auto">
            <code className="text-sm text-green-400">{selectedArchitecture.example}</code>
          </pre>
        </div>

        {/* Design Principles */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Key Design Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {designPrinciples.map((principle, i) => (
              <div key={i} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h3 className="text-lg font-bold mb-3 text-cyan-400">{principle.title}</h3>
                <ul className="space-y-2">
                  {principle.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">→</span>
                      <span className="text-slate-300 text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-lg p-8 border border-cyan-800/30">
          <h2 className="text-2xl font-bold mb-6">Implementation Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-300">
            <div>
              <h3 className="font-semibold text-cyan-400 mb-2">✓ Do</h3>
              <ul className="space-y-2">
                <li>• Start simple and add complexity as needed</li>
                <li>• Design for observability from the start</li>
                <li>• Implement comprehensive testing strategies</li>
                <li>• Use async communication when possible</li>
                <li>• Document agent responsibilities clearly</li>
                <li>• Build in fault tolerance mechanisms</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-red-400 mb-2">✗ Don't</h3>
              <ul className="space-y-2">
                <li>• Create circular dependencies between agents</li>
                <li>• Ignore error handling and recovery</li>
                <li>• Over-complicate with too many agents</li>
                <li>• Forget about agent lifecycle management</li>
                <li>• Neglect performance monitoring</li>
                <li>• Build without clear communication protocols</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-slate-500 text-sm">
          <p>Built with Next.js • Deployed on Vercel</p>
        </footer>
      </div>
    </div>
  );
}
