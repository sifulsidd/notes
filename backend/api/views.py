from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note
from rest_framework.response import Response

# cannot call route unless authenticated
# lists all the notes user created
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # if we wanted all notes can do: Note.objects.all()
        print(Note.objects.filter(author=user))
        # print(Note.objects.filter(id=1))
        # filters by author field, shows all notes by this specific user
        return Note.objects.filter(author=user)


    # reference Django documentation to figure out what functions we have to override

    # we want to do custom configurations when creating new user
    # override create method
    
    # serializer is passed data 
    # get access to serializer data and check if it is valid
    def perform_create(self, serializer):
        # if valid, makes a new version of the note
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
    
# specifies note we want to delete, deletes for us if we are authenticated
class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
 
        
class CreateUserView(generics.CreateAPIView):
    # list of different objects when create new one, make sure don't create user that exists
    queryset = User.objects.all()
    # what kind of data we need for a new user
    serializer_class = UserSerializer
    # who can call this data, think registration
    permission_classes = [AllowAny]
    
# this is important because we are getting information through the backend, if we wanted we could pass this in through props from frontend
# to just get one note
class NoteView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = NoteSerializer
    
    # first filet by just this users notes
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
 
    # get specific note
    def get_object(self):
        # gets 'id' from URL
        note_id = self.kwargs['id']
        try:
            # ensures note belongs to authenticated user
            note = Note.objects.get(id=note_id, author=self.request.user)
            return note
        except Note.DoesNotExist: 
            print("Note does not exist")

# to edit to page make sure to use UpdateAPIView 
class NoteEdit(generics.UpdateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    
    # this makes sure only the information that user has access to can be accessed   
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    
    # get specific note
    def get_object(self):
        # gets 'id' from URL
        note_id = self.kwargs['id']
        try:
            # ensures note belongs to authenticated user
            note = Note.objects.get(id=note_id, author=self.request.user)
            return note
        except Note.DoesNotExist: 
            print("Note does not exist")
