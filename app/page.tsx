'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Module {
  id: string
  name: string
  coefficient: number
  examPercentage: number
  caPercentage: number
  examScore?: number
  caScore?: number
}

const SEMESTER_5_MODULES: Module[] = [
  {
    id: 'crypto',
    name: 'Mathematical Tools For Cryptography',
    coefficient: 4,
    examPercentage: 50,
    caPercentage: 50,
  },
  {
    id: 'or',
    name: 'Operational Research',
    coefficient: 4,
    examPercentage: 50,
    caPercentage: 50,
  },
  {
    id: 'compilation',
    name: 'Compilation',
    coefficient: 4,
    examPercentage: 50,
    caPercentage: 50,
  },
  {
    id: 'software-eng',
    name: 'Software Engineering',
    coefficient: 2,
    examPercentage: 60,
    caPercentage: 40,
  },
  {
    id: 'python',
    name: 'Python Programming',
    coefficient: 2,
    examPercentage: 60,
    caPercentage: 40,
  },
  {
    id: 'web-dev',
    name: 'Web Development',
    coefficient: 2,
    examPercentage: 60,
    caPercentage: 40,
  },
  {
    id: 'tic',
    name: 'Theory of Information and Coding',
    coefficient: 1,
    examPercentage: 60,
    caPercentage: 40,
  },
  {
    id: 'bi',
    name: 'Business Intelligence',
    coefficient: 1,
    examPercentage: 100,
    caPercentage: 0,
  },
]

const SEMESTER_6_MODULES: Module[] = [
  {
    id: 'advanced-crypto',
    name: 'Advanced Cryptography',
    coefficient: 3,
    examPercentage: 50,
    caPercentage: 50,
  },
  {
    id: 'advanced-db',
    name: 'Advanced Databases',
    coefficient: 3,
    examPercentage: 50,
    caPercentage: 50,
  },
  {
    id: 'ai-notions',
    name: 'AI Notions and Principles',
    coefficient: 3,
    examPercentage: 60,
    caPercentage: 40,
  },
  {
    id: 'cloud-computing',
    name: 'Cloud Computing',
    coefficient: 3,
    examPercentage: 60,
    caPercentage: 40,
  },
  {
    id: 'dsp',
    name: 'Digital Signal Processing',
    coefficient: 2,
    examPercentage: 50,
    caPercentage: 50,
  },
  {
    id: 'mobile-dev',
    name: 'Mobile Development',
    coefficient: 2,
    examPercentage: 60,
    caPercentage: 40,
  },
  {
    id: 'modeling-sim',
    name: 'Modeling and Simulation',
    coefficient: 2,
    examPercentage: 60,
    caPercentage: 40,
  },
]

export default function GradeCalculator() {
  const [selectedSemester, setSelectedSemester] = useState<'5' | '6'>('5')
  const [semester5Modules, setSemester5Modules] = useState<Module[]>(SEMESTER_5_MODULES)
  const [semester6Modules, setSemester6Modules] = useState<Module[]>(SEMESTER_6_MODULES)
  
  const modules = selectedSemester === '5' ? semester5Modules : semester6Modules
  const setModules = selectedSemester === '5' ? setSemester5Modules : setSemester6Modules

  const handleScoreChange = (id: string, field: 'examScore' | 'caScore', value: string) => {
    setModules(
      modules.map((module) =>
        module.id === id
          ? { ...module, [field]: value === '' ? undefined : Math.min(20, Math.max(0, parseFloat(value))) }
          : module
      )
    )
  }

  const calculateModuleGrade = (module: Module): number | null => {
    if (module.examScore === undefined) return null
    if (module.caPercentage > 0 && module.caScore === undefined) return null
    const caScore = module.caScore ?? 0
    return (module.examScore * (module.examPercentage / 100) + caScore * (module.caPercentage / 100))
  }

  const calculateSemesterAverage = (): number | null => {
    let totalWeightedGrade = 0
    let totalCoefficients = 0

    for (const module of modules) {
      const grade = calculateModuleGrade(module)
      if (grade !== null) {
        totalWeightedGrade += grade * module.coefficient
        totalCoefficients += module.coefficient
      }
    }

    return totalCoefficients > 0 ? totalWeightedGrade / totalCoefficients : null
  }

  const semesterAverage = calculateSemesterAverage()
  const completedModules = modules.filter((m) => {
    if (m.caPercentage === 0) return m.examScore !== undefined
    return m.examScore !== undefined && m.caScore !== undefined
  }).length

  const getGradeColor = (grade: number | null): string => {
    if (grade === null) return 'text-gray-500'
    if (grade >= 16) return 'text-green-600'
    if (grade >= 14) return 'text-blue-600'
    if (grade >= 12) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Grade Calculator</h1>
          <p className="text-lg text-zinc-400 mb-6">Calculate your semester average with exam and continuous assessment scores</p>
          
          {/* Semester Selector */}
          <Tabs value={selectedSemester} onValueChange={(value) => setSelectedSemester(value as '5' | '6')} className="w-full flex justify-center mb-8">
            <TabsList className="grid w-fit grid-cols-2 bg-zinc-800">
              <TabsTrigger value="5" className="data-[state=active]:bg-cyan-600">Semester 5</TabsTrigger>
              <TabsTrigger value="6" className="data-[state=active]:bg-cyan-600">Semester 6</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Summary Card */}
        <Card className="mb-8 border-0 shadow-2xl bg-zinc-900 border-zinc-800 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-6">
            <CardTitle className="text-2xl text-white">Semester {selectedSemester} Summary</CardTitle>
            <CardDescription className="text-cyan-100 text-base">Overall progress and average</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-sm font-medium text-zinc-400 mb-2">Modules Completed</p>
                <p className="text-3xl font-bold text-white" suppressHydrationWarning>
                  {completedModules}/{modules.length}
                </p>
                <Progress value={(completedModules / modules.length) * 100} className="mt-2" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-zinc-400 mb-2">Semester Average</p>
                <p className={`text-3xl font-bold ${getGradeColor(semesterAverage)}`} suppressHydrationWarning>
                  {semesterAverage !== null ? semesterAverage.toFixed(2) : '—'}
                </p>
                <p className="text-xs text-zinc-500 mt-2">out of 20</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-zinc-400 mb-2">Grade Status</p>
                <p className={`text-2xl font-bold ${getGradeColor(semesterAverage)}`} suppressHydrationWarning>
                  {semesterAverage === null
                    ? 'Incomplete'
                    : semesterAverage >= 12
                      ? 'Passing'
                      : 'Needs Work'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module) => {
            const grade = calculateModuleGrade(module)
            const isComplete = module.caPercentage === 0 
              ? module.examScore !== undefined
              : module.examScore !== undefined && module.caScore !== undefined

            return (
              <Card key={module.id} className="border-0 shadow-lg hover:shadow-2xl transition-all bg-zinc-900 border-zinc-800">
                <CardHeader className="bg-zinc-800 border-b border-zinc-700">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-white">{module.name}</CardTitle>
                      <CardDescription className="text-zinc-400">
                        Coefficient: <span className="font-semibold text-zinc-300">{module.coefficient}</span>
                      </CardDescription>
                    </div>
                    {isComplete && (
                      <div className={`text-2xl font-bold ${getGradeColor(grade)}`} suppressHydrationWarning>{grade?.toFixed(2)}</div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {/* Evaluation percentages info */}
                  <div className="mb-6 p-3 bg-cyan-900/30 rounded-lg border border-cyan-700/50">
                    <p className="text-xs text-cyan-300 font-medium mb-2">Evaluation Structure:</p>
                    <div className="flex gap-4 text-sm">
                      <span className="text-cyan-400">
                        <span className="font-semibold">Exam:</span> {module.examPercentage}%
                      </span>
                      {module.caPercentage > 0 && (
                        <span className="text-emerald-400">
                          <span className="font-semibold">CA:</span> {module.caPercentage}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Score inputs */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor={`exam-${module.id}`} className="text-sm font-medium text-zinc-300">
                        Exam Score (Exam: {module.examPercentage}%)
                      </Label>
                      <Input
                        id={`exam-${module.id}`}
                        type="number"
                        min="0"
                        max="20"
                        step="0.5"
                        placeholder="0-20"
                        value={module.examScore ?? ''}
                        onChange={(e) => handleScoreChange(module.id, 'examScore', e.target.value)}
                        className="mt-1 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500"
                      />
                    </div>
                    {module.caPercentage > 0 && (
                      <div>
                        <Label htmlFor={`ca-${module.id}`} className="text-sm font-medium text-zinc-300">
                          CA Score (Continuous Assessment: {module.caPercentage}%)
                        </Label>
                        <Input
                          id={`ca-${module.id}`}
                          type="number"
                          min="0"
                          max="20"
                          step="0.5"
                          placeholder="0-20"
                          value={module.caScore ?? ''}
                          onChange={(e) => handleScoreChange(module.id, 'caScore', e.target.value)}
                          className="mt-1 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500"
                        />
                      </div>
                    )}
                  </div>

                  {/* Progress bar */}
                  {isComplete && (
                    <div className="mt-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-zinc-400">Module Progress</span>
                        <span className={`font-semibold ${getGradeColor(grade)}`}>{grade?.toFixed(1)}/20</span>
                      </div>
                      <Progress value={(grade ?? 0) * 5} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Footer info */}
        <div className="mt-8 p-4 bg-amber-900/30 border border-amber-700/50 rounded-lg text-sm text-amber-300">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter your exam score for each module (0-20)</li>
            <li>Enter CA scores where applicable (some modules only have exam)</li>
            <li>Your module grade will automatically calculate based on the exam/CA percentage split</li>
            <li>Your semester average will be calculated using the weighted coefficients</li>
            <li>Scores are saved as you type</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
