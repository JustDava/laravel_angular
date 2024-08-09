<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Http\Resources\Student as StudentResource;
use App\Http\Resources\StudentCollection;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index()
    {
        return new StudentCollection(Student::all());
    }

    public function show($id)
    {
        return new StudentResource(Student::findOrFail($id));
    }

    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'patronymic' => 'required|max:255',
            'birthday' => 'required',
            'gender' => 'required',
        ]);

        $student = Student::create($request->all());

        return (new StudentResource($student))
            ->response()
            ->setStatusCode(201);
    }

    public function update(Request $request)
    {
        $request->validate([
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'patronymic' => 'required|max:255',
            'birthday' => 'required',
            'gender' => 'required',
        ]);

        $student = Student::findOrFail($request->id);
        $student->update($request->all());

        return (new StudentResource($student))
            ->response()
            ->setStatusCode(201);
    }

    public function delete($id)
    {
        $student = Student::findOrFail($id);
        $student->delete();

        return response()->json(null, 204);
    }
}
