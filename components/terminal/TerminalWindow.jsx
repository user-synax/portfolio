'use client'
import { useState, useEffect, useRef } from 'react'
import {
  Folder, CircleCheck, Mail, GitBranch
} from 'lucide-react'
import { COMMANDS, WELCOME_MESSAGE } from './commands.js'

const iconMap = {
  'folder': Folder,
  'circle-check': CircleCheck,
  'mail': Mail,
  'github': GitBranch
}

export default function TerminalWindow() {
  const [history, setHistory] = useState([])
  const [currentInput, setCurrentInput] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)
  const inputRef = useRef(null)
  const terminalRef = useRef(null)

  useEffect(() => {
    // Initialize with welcome message
    const welcomeHistory = WELCOME_MESSAGE.map(line => ({
      type: 'welcome',
      content: line
    }))
    setHistory(welcomeHistory)
    
    // Focus input on mount
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    // Auto-focus input when clicking anywhere on terminal
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }

    // Handle ESC key to go back
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        window.location.href = '/'
      }
    }

    const terminal = terminalRef.current
    if (terminal) {
      terminal.addEventListener('click', handleClick)
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        terminal.removeEventListener('click', handleClick)
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [])

  useEffect(() => {
    // Scroll to bottom when history changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    // Update suggestions based on current input
    const trimmedInput = currentInput.trim().toLowerCase()
    if (trimmedInput === '') {
      setSuggestions([])
      setSelectedSuggestionIndex(-1)
      return
    }

    const matchedCommands = Object.keys(COMMANDS).filter(cmd =>
      cmd.startsWith(trimmedInput)
    )
    setSuggestions(matchedCommands)
    setSelectedSuggestionIndex(-1)
  }, [currentInput])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      // If a suggestion is selected, use it
      if (selectedSuggestionIndex >= 0 && suggestions[selectedSuggestionIndex]) {
        setCurrentInput(suggestions[selectedSuggestionIndex])
        setSuggestions([])
        setSelectedSuggestionIndex(-1)
        return
      }
      processCommand(currentInput)
      setCurrentInput('')
      setSuggestions([])
      setSelectedSuggestionIndex(-1)
    } else if (e.key === 'Tab') {
      e.preventDefault()
      // Auto-complete with first suggestion or selected suggestion
      if (suggestions.length > 0) {
        const suggestionToUse = selectedSuggestionIndex >= 0
          ? suggestions[selectedSuggestionIndex]
          : suggestions[0]
        setCurrentInput(suggestionToUse)
        setSuggestions([])
        setSelectedSuggestionIndex(-1)
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (suggestions.length > 0) {
        setSelectedSuggestionIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (suggestions.length > 0) {
        setSelectedSuggestionIndex(prev => (prev > 0 ? prev - 1 : -1))
      }
    } else if (e.key === 'Escape') {
      setSuggestions([])
      setSelectedSuggestionIndex(-1)
    }
  }

  const processCommand = (input) => {
    const trimmedInput = input.trim().toLowerCase()
    
    // Push the user's input to history
    const newHistory = [...history, { type: 'input', content: input }]

    if (trimmedInput === 'clear') {
      // Reset to welcome message only
      const welcomeHistory = WELCOME_MESSAGE.map(line => ({
        type: 'welcome',
        content: line
      }))
      setHistory(welcomeHistory)
      return
    }

    if (trimmedInput === '/') {
      // Show all commands with descriptions
      const commandList = Object.entries(COMMANDS).map(([key, value]) => 
        `${key}: ${value.description}`
      )
      commandList.unshift('Available commands:')
      commandList.forEach(line => {
        newHistory.push({ type: 'output', content: line })
      })
    } else if (trimmedInput === '') {
      // Empty input, do nothing
    } else if (COMMANDS[trimmedInput]) {
      // Command found
      const command = COMMANDS[trimmedInput]
      if (Array.isArray(command.output)) {
        command.output.forEach(line => {
          newHistory.push({ type: 'output', content: line })
        })
      } else {
        newHistory.push({ type: 'output', content: command.output })
      }
    } else {
      // Command not found
      newHistory.push({ 
        type: 'output', 
        content: `command not found: ${input}. Type '/' for available commands.` 
      })
    }

    // Keep only last 100 items
    const trimmedHistory = newHistory.slice(-100)
    setHistory(trimmedHistory)
  }

  const renderContent = (item) => {
    const content = item.content
    if (Array.isArray(content)) {
      return content.map((line, index) => (
        <div key={index} className={getColorClass(item.type)}>
          {renderLine(line)}
        </div>
      ))
    }
    return <div className={getColorClass(item.type)}>{renderLine(content)}</div>
  }

  const renderLine = (line) => {
    // Parse [icon:name] patterns and replace with Lucide icons
    const parts = line.split(/\[icon:(\w+)\]/g)
    return parts.map((part, index) => {
      // Even indices are regular text, odd indices are icon names
      if (index % 2 === 1) {
        const IconComponent = iconMap[part]
        if (IconComponent) {
          return <IconComponent key={index} className="inline w-4 h-4 mr-2 text-emerald-400" />
        }
      }
      return part
    })
  }

  const getColorClass = (type) => {
    switch (type) {
      case 'welcome':
        return 'text-zinc-500'
      case 'input':
        return 'text-emerald-400'
      case 'output':
        return 'text-zinc-400'
      default:
        return 'text-zinc-400'
    }
  }

  return (
    <div
      ref={terminalRef}
      className="h-screen w-full bg-black font-mono p-8 flex flex-col gap-4 cursor-text"
    >
      {/* ESC hint */}
      <a
        href="/"
        className="fixed top-4 right-4 text-zinc-600 text-xs hover:text-zinc-400 transition-colors"
      >
        ESC to go back
      </a>

      {/* Mobile go back button */}
      <a
        href="/"
        className="md:hidden fixed top-4 left-4 bg-zinc-800 text-zinc-300 px-3 py-1 rounded text-xs hover:bg-zinc-700 transition-colors"
      >
        ← Back
      </a>

      {/* History - scrollable area */}
      <div className="flex-1 overflow-auto">
        {history.map((item, index) => (
          <div key={index} className="mb-2">
            {item.type === 'input' && (
              <div className="flex items-start">
                <span className="text-emerald-500 text-2xl mr-2">❯</span>
                <span className="text-emerald-400 text-2xl">{item.content}</span>
              </div>
            )}
            {item.type !== 'input' && renderContent(item)}
          </div>
        ))}
      </div>

      {/* Input area - fixed at bottom */}
      <div className="flex flex-col pb-8">
        {/* Input line */}
        <div className="flex items-center">
          <span className="text-emerald-500 text-2xl mr-2">❯</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white outline-none caret-emerald-500 text-2xl"
            autoFocus
          />
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="mt-2 bg-zinc-900 border border-zinc-800 rounded p-2">
            {suggestions.map((suggestion, index) => (
              <div
                key={suggestion}
                onClick={() => {
                  setCurrentInput(suggestion)
                  setSuggestions([])
                  setSelectedSuggestionIndex(-1)
                  if (inputRef.current) {
                    inputRef.current.focus()
                  }
                }}
                className={`cursor-pointer px-2 py-1 text-sm ${
                  index === selectedSuggestionIndex
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'text-zinc-400 hover:text-zinc-300'
                }`}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
